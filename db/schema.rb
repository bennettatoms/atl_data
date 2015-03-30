# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150330182703) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bldg_permits", force: :cascade do |t|
    t.integer "year"
    t.string  "county"
    t.integer "total_buildings"
    t.integer "total_units"
    t.integer "value"
  end

  create_table "movers", force: :cascade do |t|
    t.integer "year"
    t.string  "origin_state"
    t.string  "origin_county"
    t.string  "dest_state"
    t.string  "dest_county"
    t.integer "num_movers"
  end

end
