class Pet < ApplicationRecord
  has_many :events, dependent: :destroy
end
