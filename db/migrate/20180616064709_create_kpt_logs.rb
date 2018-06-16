class CreateKptLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :kpt_logs do |t|
      t.references :user, null: false
      t.text :keep, null: false
      t.text :problem, null: false
      t.text :try, null: false

      t.timestamps null: false, limit: 6
    end
  end
end
