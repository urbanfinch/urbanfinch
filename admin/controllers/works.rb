Admin.controllers :works do

  get :index do
    @works = Work.all
    render 'works/index'
  end

  get :new do
    @work = Work.new
    render 'works/new'
  end

  post :create do
    @work = Work.new(params[:work])
    if @work.save
      flash[:notice] = 'Work was successfully created.'
      redirect url(:works, :edit, :id => @work.id)
    else
      render 'works/new'
    end
  end

  get :edit, :with => :id do
    @work = Work.find(params[:id])
    render 'works/edit'
  end

  put :update, :with => :id do
    @work = Work.find(params[:id])
    if @work.update_attributes(params[:work])
      flash[:notice] = 'Work was successfully updated.'
      redirect url(:works, :edit, :id => @work.id)
    else
      render 'works/edit'
    end
  end

  delete :destroy, :with => :id do
    work = Work.find(params[:id])
    if work.destroy
      flash[:notice] = 'Work was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Work!'
    end
    redirect url(:works, :index)
  end
end
