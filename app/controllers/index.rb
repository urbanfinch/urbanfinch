require 'net/smtp'

Urbanfinch.controllers :index do
  
  get :index, :map => '/' do
    @clients = Client.all.sort_by{ rand }.take(9)
    @people = Person.all
    @services = Service.all
    @indoors = Indoor.all
    @works = Work.all
    
    render :urbanfinch
  end
  
  post '/contact' do
    begin
      smtp = {
        :address        => "smtp.sendgrid.net",
        :port           => "25",
        :authentication => :plain,
        :user_name      => ENV['SENDGRID_USERNAME'],
        :password       => ENV['SENDGRID_PASSWORD'],
        :domain         => ENV['SENDGRID_DOMAIN']
      }
      recipient = 'thefinch@urbanfinch.com'
      Net::SMTP.start(smtp[:address], smtp[:port], smtp[:domain], smtp[:user_name], smtp[:password]) do |smtp|
        smtp.open_message_stream(params[:email], recipient) do |f|
          f.puts 'From: ' + params[:email]
          f.puts 'To: ' + recipient
          f.puts 'Subject: Urban Finch Website Contact - ' + params[:name]
          f.puts
          f.puts params[:message]
        end
      end
      if request.xhr?
        content_type :json
        {:feedback => 'Thanks! Your message has been sent!'}.to_json
      else
        redirect '/'
      end
    rescue
      if request.xhr?
        content_type :json
        {:feedback => 'Oops! There was a problem. Try again later!'}.to_json
      else
        redirect '/'
      end
    end
  end
  
end
