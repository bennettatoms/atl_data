class CreateBldgPermits < ActiveRecord::Migration
  def change
    drop_table :bldg_permits
    create_table :bldg_permits, force: :cascade do |t|
      t.integer "year"
      t.string  "county"
      t.integer "total_buildings"
      t.integer "total_units"
      t.integer "value"
    end
  end
end
