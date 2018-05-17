class CreateForms < ActiveRecord::Migration
  def change
    create_table :forms do |t|
      t.integer :status
      t.integer :session
      t.string :year
      t.integer :form1
      t.integer :form2
      t.integer :form3
      t.integer :form4
      t.integer :form5
      t.integer :form6
      t.integer :form7
      t.integer :form8
      t.integer :form9
      t.integer :form10
      t.integer :form11
      t.integer :form12
      t.integer :form13
      t.integer :form14
      t.integer :form15
      t.integer :form16
      t.integer :form17
      t.integer :form18
      t.integer :form19
      t.integer :form20
      t.integer :form21
      t.integer :form22
      t.integer :form23
      t.integer :total
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
