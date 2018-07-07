class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
      t.string :name, null: false
      t.string :email, null: false

      t.timestamps limit: 6, null: false
    end
  end
end
