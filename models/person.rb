class Person
  include MongoMapper::Document
  
  key :name, String
  key :email, String
  key :bio, String
  key :position, Integer
  one :image
  
  timestamps!
end
