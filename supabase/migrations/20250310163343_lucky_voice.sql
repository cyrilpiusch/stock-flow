/*
  # Initial Schema Setup for StockFlow

  1. New Tables
    - `owner` - Stores owner authentication details
    - `branch` - Stores supermarket branch information
    - `product` - Stores product information
    - `inventory` - Tracks stock levels per branch
    - `employee` - Stores employee information
    - `sales` - Tracks sales transactions
    - `sale_details` - Stores individual items in sales

  2. Security
    - Enable RLS on all tables
    - Add policies for owner access
*/

-- Create owner table
CREATE TABLE IF NOT EXISTS owner (
    owner_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE owner ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner can manage their own data"
    ON owner
    FOR ALL
    TO authenticated
    USING (auth.uid() = owner_id);

-- Create branch table
CREATE TABLE IF NOT EXISTS branch (
    branch_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_name TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    owner_id UUID REFERENCES owner(owner_id)
);

ALTER TABLE branch ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner can manage branches"
    ON branch
    FOR ALL
    TO authenticated
    USING (owner_id = auth.uid());

-- Create product table
CREATE TABLE IF NOT EXISTS product (
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    owner_id UUID REFERENCES owner(owner_id)
);

ALTER TABLE product ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner can manage products"
    ON product
    FOR ALL
    TO authenticated
    USING (owner_id = auth.uid());

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    inventory_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES branch(branch_id) ON DELETE CASCADE,
    product_id UUID REFERENCES product(product_id) ON DELETE CASCADE,
    stock_quantity INT NOT NULL CHECK (stock_quantity >= 0),
    min_stock_threshold INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    owner_id UUID REFERENCES owner(owner_id)
);

ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner can manage inventory"
    ON inventory
    FOR ALL
    TO authenticated
    USING (owner_id = auth.uid());

-- Create employee table
CREATE TABLE IF NOT EXISTS employee (
    employee_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES branch(branch_id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    contact TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    owner_id UUID REFERENCES owner(owner_id)
);

ALTER TABLE employee ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner can manage employees"
    ON employee
    FOR ALL
    TO authenticated
    USING (owner_id = auth.uid());

-- Create sales table
CREATE TABLE IF NOT EXISTS sales (
    sale_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES branch(branch_id) ON DELETE CASCADE,
    sale_date TIMESTAMP DEFAULT now(),
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    owner_id UUID REFERENCES owner(owner_id)
);

ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner can manage sales"
    ON sales
    FOR ALL
    TO authenticated
    USING (owner_id = auth.uid());

-- Create sale_details table
CREATE TABLE IF NOT EXISTS sale_details (
    sale_detail_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sale_id UUID REFERENCES sales(sale_id) ON DELETE CASCADE,
    product_id UUID REFERENCES product(product_id) ON DELETE CASCADE,
    quantity_sold INT NOT NULL CHECK (quantity_sold > 0),
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    owner_id UUID REFERENCES owner(owner_id)
);

ALTER TABLE sale_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner can manage sale details"
    ON sale_details
    FOR ALL
    TO authenticated
    USING (owner_id = auth.uid());

-- Create function to update inventory after sale
CREATE OR REPLACE FUNCTION update_inventory_after_sale()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE inventory
    SET stock_quantity = stock_quantity - NEW.quantity_sold,
        updated_at = now()
    WHERE product_id = NEW.product_id
    AND branch_id = (
        SELECT branch_id
        FROM sales
        WHERE sale_id = NEW.sale_id
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for inventory update
CREATE TRIGGER after_sale_detail_insert
    AFTER INSERT ON sale_details
    FOR EACH ROW
    EXECUTE FUNCTION update_inventory_after_sale();