class Work
  include MongoMapper::Document

  key :name, String
  many :jobs
  
  timestamps!
end
