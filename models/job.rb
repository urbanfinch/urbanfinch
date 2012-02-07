class Job
  include MongoMapper::Document
  
  key :name, String
  key :url, String
  key :position, Integer
  one :image
  belongs_to :work
  
  timestamps!
end
