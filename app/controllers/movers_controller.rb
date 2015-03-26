class MoversController < ApplicationController
  before_action :set_mover, only: [:show, :update, :destroy]

  # GET /movers
  # GET /movers.json
  def index
    @movers = Mover.all

    render json: @movers
  end

  # GET /movers/1
  # GET /movers/1.json
  def show
    render json: @mover
  end

  # POST /movers
  # POST /movers.json
  def create
    @mover = Mover.new(mover_params)

    if @mover.save
      render json: @mover, status: :created, location: @mover
    else
      render json: @mover.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /movers/1
  # PATCH/PUT /movers/1.json
  def update
    @mover = Mover.find(params[:id])

    if @mover.update(mover_params)
      head :no_content
    else
      render json: @mover.errors, status: :unprocessable_entity
    end
  end

  # DELETE /movers/1
  # DELETE /movers/1.json
  def destroy
    @mover.destroy

    head :no_content
  end

  private

    def set_mover
      @mover = Mover.find(params[:id])
    end

    def mover_params
      params[:mover]
    end
end
