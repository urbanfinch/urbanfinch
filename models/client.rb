class Client
  include MongoMapper::Document
  plugin Joint
  
  key :name, String
  key :url, String
  
  timestamps!
  
  attachment :image
end
