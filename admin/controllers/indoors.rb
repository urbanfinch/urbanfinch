Admin.controllers :indoors do

  get :index do
    @indoors = Indoor.all
    render 'indoors/index'
  end

  get :new do
    @indoor = Indoor.new
    render 'indoors/new'
  end

  post :create do
    @indoor = Indoor.new(params[:indoor])
    if @indoor.save
      flash[:notice] = 'Indoor was successfully created.'
      redirect url(:indoors, :edit, :id => @indoor.id)
    else
      render 'indoors/new'
    end
  end

  get :edit, :with => :id do
    @indoor = Indoor.find(params[:id])
    render 'indoors/edit'
  end

  put :update, :with => :id do
    @indoor = Indoor.find(params[:id])
    if @indoor.update_attributes(params[:indoor])
      flash[:notice] = 'Indoor was successfully updated.'
      redirect url(:indoors, :edit, :id => @indoor.id)
    else
      render 'indoors/edit'
    end
  end

  delete :destroy, :with => :id do
    indoor = Indoor.find(params[:id])
    if indoor.destroy
      flash[:notice] = 'Indoor was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Indoor!'
    end
    redirect url(:indoors, :index)
  end
end
