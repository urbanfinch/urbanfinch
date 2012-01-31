class Job
  include MongoMapper::Document
  plugin Joint
  
  key :name, String
  key :url, String
  belongs_to :work
  
  timestamps!
  
  attachment :image
end
