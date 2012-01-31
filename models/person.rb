class Person
  include MongoMapper::Document
  plugin Joint
  
  key :name, String
  key :email, String
  key :bio, String
  
  timestamps!
  
  attachment :image
end
