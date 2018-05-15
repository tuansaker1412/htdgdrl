class CreateForms < ActiveRecord::Migration
  def change
    create_table :forms do |t|
      t.string :status
      t.integer :session
      t.integer :year
      t.string :form
      t.integer :total
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
