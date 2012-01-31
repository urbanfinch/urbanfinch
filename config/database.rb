MongoMapper.connection = Mongo::Connection.new((ENV['MONGOLAB_URI'] ||= 'localhost'), nil, :logger => logger)

case Padrino.env
  when :development then MongoMapper.database = 'urbanfinch_development'
  when :production  then MongoMapper.database = 'urbanfinch_production'
  when :test        then MongoMapper.database = 'urbanfinch_test'
end
