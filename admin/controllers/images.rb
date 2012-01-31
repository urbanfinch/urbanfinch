Admin.controllers :images do

  get :index do
    @images = Image.all
    render 'images/index'
  end

  get :new do
    @image = Image.new
    render 'images/new'
  end

  post :create do
    unless params[:image][:image].nil?
      @image = Image.new
      @image.image = params[:image][:image][:tempfile]
      @image.person_id = params[:image]['person_id']
      @image.client_id = params[:image]['client_id']
      @image.job_id = params[:image]['job_id']
        
      if @image.save
        flash[:notice] = 'Image was successfully created.'
        redirect url(:images, :edit, :id => @image.id)
      else
        render 'images/new'
      end
    else
      flash[:notice] = 'Image could not be created.'
      redirect url(:images, :new, :id => @image.id)
    end
  end

  get :edit, :with => :id do
    @image = Image.find(params[:id])
    render 'images/edit'
  end

  put :update, :with => :id do
    @image = Image.find(params[:id])
    unless params[:image][:image][:tempfile].nil?
      @image.image = params[:image][:image][:tempfile]
    end
    @image.person_id = params[:image]['person_id']
    @image.client_id = params[:image]['client_id']
    @image.job_id = params[:image]['job_id']
    
    if @image.save
      flash[:notice] = 'Image was successfully updated.'
      redirect url(:images, :edit, :id => @image.id)
    else
      render 'images/edit'
    end
  end

  delete :destroy, :with => :id do
    image = Image.find(params[:id])
    if image.destroy
      flash[:notice] = 'Image was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Image!'
    end
    redirect url(:images, :index)
  end
end
