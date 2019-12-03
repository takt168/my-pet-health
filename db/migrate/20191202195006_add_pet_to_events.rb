class AddPetToEvents < ActiveRecord::Migration[6.0]
  def change
    add_reference :events, :pet, null: false, foreign_key: true
  end
end
