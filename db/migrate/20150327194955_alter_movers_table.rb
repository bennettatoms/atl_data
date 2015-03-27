class AlterMoversTable < ActiveRecord::Migration
  def change
    drop_table "movers"
    create_table "movers", force: :cascade do |t|
      t.integer  "year"
      t.string   "origin_state"
      t.string   "origin_county"
      t.string   "dest_state"
      t.string   "dest_county"
      t.integer  "num_movers"
    end
  end
end
