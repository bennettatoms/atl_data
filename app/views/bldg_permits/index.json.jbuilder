json.array!(@bldg_permits) do |bldg_permit|
  json.extract! bldg_permit, :id
  json.url bldg_permit_url(bldg_permit, format: :json)
end
