class Indoor
  include MongoMapper::Document

  key :name, String
  key :description, String
  
  timestamps!
end
