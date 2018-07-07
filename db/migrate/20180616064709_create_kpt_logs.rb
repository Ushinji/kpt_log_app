class CreateKptLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :kpt_logs, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'  do |t|
      t.references :user, null: false
      t.text :keep, null: false
      t.text :problem, null: false
      t.text :try, null: false

      t.timestamps limit: 6, null: false
    end
  end
end
