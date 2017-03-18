class NoticeBoard < ActiveRecord::Base
  attr_accessible :type, :message, :user_id, :player_id
  belongs_to :user
end
