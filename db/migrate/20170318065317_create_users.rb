class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
    	t.column :name, :string
    	t.column :color, :string
    	t.column :player_id, :integer
      	t.timestamps
    end
    create_table :notice_boards do |t|
    	t.column :user_id, :integer
    	t.column :msg_type, :string
    	t.column :message, :string
      	t.timestamps
    end    
  end
end
