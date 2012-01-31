require 'mongo_mapper'
require 'joint'

class Client
  include MongoMapper::Document
  plugin Joint
  
  key :name,       String
  key :url,        String
  
  timestamps!
  
  attachment :image
end

class Person
  include MongoMapper::Document
  plugin Joint
  
  key :name,       String
  key :email,      String
  key :bio,        String
  
  timestamps!
  
  attachment :image
end

class Service
  include MongoMapper::Document
  
  key :name,         String
  key :description,  String
  
  timestamps!
end

class Indoor
  include MongoMapper::Document
  
  key :name,         String
  key :description,  String
  
  timestamps!
end

class Work
  include MongoMapper::Document
  
  key :name,       String
  many :jobs
  
  timestamps!
end

class Job
  include MongoMapper::EmbeddedDocument
  plugin Joint
  
  key :name,       String
  key :url,        String
  
  attachment :image
end