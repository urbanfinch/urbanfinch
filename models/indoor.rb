class Indoor
  include MongoMapper::Document

  key :name, String
  key :description, String
  key :position, Integer
  
  timestamps!
end
