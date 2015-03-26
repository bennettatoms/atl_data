class Movers < ActiveRecord::Migration
  def change
    create_table "movers", force: :cascade do |t|
      t.integer  "year"
      t.integer  "origin_code_state"
      t.integer  "origin_code_county"
      t.string   "origin_state"
      t.string   "origin_county"
      t.integer  "dest_code_state"
      t.integer  "dest_code_county"
      t.string   "dest_state"
      t.string   "dest_county"
      t.integer  "num_movers"
      t.datetime "created_at",         null: false
      t.datetime "updated_at",         null: false
    end
  end
end
