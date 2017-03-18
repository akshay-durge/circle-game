class NoticeBoard < ActiveRecord::Base
  attr_accessible :msg_type, :message, :user_id, :player_id
  belongs_to :user
end
