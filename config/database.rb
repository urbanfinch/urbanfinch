if ENV['MONGOLAB_URI']
  uri = URI.parse(ENV['MONGOLAB_URI'])
  MongoMapper.connection = Mongo::Connection.new(uri.host, uri.port, :logger => logger)
  MongoMapper.database = uri.path.gsub(/^\//, '')
  MongoMapper.database.authenticate(uri.user, uri.password)
else
  MongoMapper.connection = Mongo::Connection.new('localhost', 27017, :logger => logger)
  MongoMapper.database = 'urbanfinch_' + Padrino.env.to_s
end