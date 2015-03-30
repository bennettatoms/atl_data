require 'csv'

task :push_csv_to_db => :environment do
  desc "Push csv data into database table"
  # file_name = 'lib/tasks/2011_metro_atlanta_migrations_reduced.csv'
  # file_name = 'lib/tasks/small.csv'
  file_name = 'lib/tasks/five-county_annual_housing_permits_since_2000.csv'
  CSV.foreach(Rails.root + file_name, :headers => true) do |row|
    BldgPermit.create!(row.to_hash)
  end
end  
