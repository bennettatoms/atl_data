require 'csv'

task :push_csv_to_db => :environment do
  desc "Push movers csv data into movers database"
  file_name = 'lib/tasks/2011_metro_atlanta_migrations.csv'
  # file_name = 'lib/tasks/small.csv'
  CSV.foreach(Rails.root + file_name, :headers => true) do |row|
    Mover.create!(row.to_hash)
  end
end  
