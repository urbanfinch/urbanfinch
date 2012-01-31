class Image
  include MongoMapper::Document
  plugin Joint
  
  belongs_to :client
  belongs_to :person
  belongs_to :job
  
  timestamps!
  
  attachment :image
end
