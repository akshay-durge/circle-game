class User < ActiveRecord::Base
  attr_accessible :name, :color, :player_id
end
