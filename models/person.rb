class Person
  include MongoMapper::Document
  
  key :name, String
  key :email, String
  key :bio, String
  one :image
  
  timestamps!
end
