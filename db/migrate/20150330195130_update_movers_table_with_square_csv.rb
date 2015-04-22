class UpdateMoversTableWithSquareCsv < ActiveRecord::Migration
  def change
    # drop_table "movers"
    create_table "movers", force: :cascade do |t|
      t.integer  "year"
      t.string   "atl_county"
      t.string   "state"
      t.integer  "inbound"
      t.integer  "outbound"
    end
  end
end
