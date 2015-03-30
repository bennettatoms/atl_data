class BldgPermitsController < ApplicationController
  before_action :set_bldg_permit, only: [:show, :update, :destroy]

  # GET /bldg_permits
  # GET /bldg_permits.json
  def index
    @bldg_permits = BldgPermit.all

    render json: @bldg_permits
  end

  # GET /bldg_permits/1
  # GET /bldg_permits/1.json
  def show
    render json: @bldg_permit
  end

  # POST /bldg_permits
  # POST /bldg_permits.json
  def create
    @bldg_permit = BldgPermit.new(bldg_permit_params)

    if @bldg_permit.save
      render json: @bldg_permit, status: :created, location: @bldg_permit
    else
      render json: @bldg_permit.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bldg_permits/1
  # PATCH/PUT /bldg_permits/1.json
  def update
    @bldg_permit = BldgPermit.find(params[:id])

    if @bldg_permit.update(bldg_permit_params)
      head :no_content
    else
      render json: @bldg_permit.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bldg_permits/1
  # DELETE /bldg_permits/1.json
  def destroy
    @bldg_permit.destroy

    head :no_content
  end

  private

    def set_bldg_permit
      @bldg_permit = BldgPermit.find(params[:id])
    end

    def bldg_permit_params
      params[:bldg_permit]
    end
end
