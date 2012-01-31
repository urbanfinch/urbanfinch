class Client
  include MongoMapper::Document
  
  key :name, String
  key :url, String
  one :image
  
  timestamps!
end
