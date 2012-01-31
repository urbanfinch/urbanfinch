Admin.controllers :clients do

  get :index do
    @clients = Client.all
    render 'clients/index'
  end

  get :new do
    @client = Client.new
    render 'clients/new'
  end

  post :create do
    @client = Client.new(params[:client])
    if @client.save
      flash[:notice] = 'Client was successfully created.'
      redirect url(:clients, :edit, :id => @client.id)
    else
      render 'clients/new'
    end
  end

  get :edit, :with => :id do
    @client = Client.find(params[:id])
    render 'clients/edit'
  end

  put :update, :with => :id do
    @client = Client.find(params[:id])
    if @client.update_attributes(params[:client])
      flash[:notice] = 'Client was successfully updated.'
      redirect url(:clients, :edit, :id => @client.id)
    else
      render 'clients/edit'
    end
  end

  delete :destroy, :with => :id do
    client = Client.find(params[:id])
    if client.destroy
      flash[:notice] = 'Client was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Client!'
    end
    redirect url(:clients, :index)
  end
end
