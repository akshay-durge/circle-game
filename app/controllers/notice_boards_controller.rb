class NoticeBoardsController < ApplicationController
  respond_to :html, :json
  skip_before_filter  :verify_authenticity_token  
  # GET /notice_boards
  # GET /notice_boards.json
  def index
    @notice_boards = NoticeBoard.all
    render :json => { :notice_boards =>  @notice_boards.as_json}    
  end

  # GET /notice_boards/1
  # GET /notice_boards/1.json
  def show
    @notice_board = NoticeBoard.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @notice_board }
    end
  end

  # GET /notice_boards/new
  # GET /notice_boards/new.json
  def new
    @notice_board = NoticeBoard.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @notice_board }
    end
  end

  # GET /notice_boards/1/edit
  def edit
    @notice_board = NoticeBoard.find(params[:id])
  end

  # POST /notice_boards
  # POST /notice_boards.json
  def create
    @notice_board = NoticeBoard.new(params[:notice_board])
    @user = User.where(player_id: params[:player_id])[0]
    @notice_board.user = @user
    if @notice_board.save
      render :json => { :message => "Notice board was successfully created." }, status: 200
    else
      render :json => { :message =>  @notice_board.errors.messages }, status: 500
    end
  end

  # PUT /notice_boards/1
  # PUT /notice_boards/1.json
  def update
    @notice_board = NoticeBoard.find(params[:id])

    respond_to do |format|
      if @notice_board.update_attributes(params[:notice_board])
        format.html { redirect_to @notice_board, notice: 'Notice board was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @notice_board.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /notice_boards/1
  # DELETE /notice_boards/1.json
  def destroy
    NoticeBoard.delete_all
    render :json => { :message => "Notice Board Messages deleted successfully." }, status: 200
  end
end
