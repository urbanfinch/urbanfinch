Admin.controllers :jobs do

  get :index do
    @jobs = Job.sort(:position)
    render 'jobs/index'
  end

  get :new do
    @job = Job.new
    render 'jobs/new'
  end

  post :create do
    @job = Job.new(params[:job])
    if @job.save
      flash[:notice] = 'Job was successfully created.'
      redirect url(:jobs, :edit, :id => @job.id)
    else
      render 'jobs/new'
    end
  end

  get :edit, :with => :id do
    @job = Job.find(params[:id])
    render 'jobs/edit'
  end

  put :update, :with => :id do
    @job = Job.find(params[:id])
    if @job.update_attributes(params[:job])
      flash[:notice] = 'Job was successfully updated.'
      redirect url(:jobs, :edit, :id => @job.id)
    else
      render 'jobs/edit'
    end
  end

  delete :destroy, :with => :id do
    job = Job.find(params[:id])
    if job.destroy
      flash[:notice] = 'Job was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Job!'
    end
    redirect url(:jobs, :index)
  end
end
