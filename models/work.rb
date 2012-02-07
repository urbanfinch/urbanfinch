class Work
  include MongoMapper::Document

  key :name, String
  key :position, Integer
  many :jobs
  
  timestamps!
end
