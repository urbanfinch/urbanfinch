class Job
  include MongoMapper::Document
  
  key :name, String
  key :url, String
  one :image
  belongs_to :work
  
  timestamps!
end
