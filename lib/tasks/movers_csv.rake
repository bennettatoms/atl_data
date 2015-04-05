require 'csv'

task :push_csv_to_db => :environment do
  desc "Push csv data into database table"
  file_name = 'lib/tasks/2010_migrations_square.csv'
  # file_name = 'lib/tasks/2009_migrations_square.csv'
  # file_name = 'lib/tasks/2008_migrations_square.csv'
  # file_name = 'lib/tasks/2007_migrations_square.csv'
  # file_name = 'lib/tasks/small.csv'
  # file_name = 'lib/tasks/five-county_annual_housing_permits_since_2000.csv'
  CSV.foreach(Rails.root + file_name, :headers => true) do |row|
    Mover.create!(row.to_hash)
  end
end  
