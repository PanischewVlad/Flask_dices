from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

def roll_dice():
    return random.randint(1, 6), random.randint(1, 6)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/roll', methods=['POST'])
def roll():
    player_dice = roll_dice()
    dealer_dice = roll_dice()

    player_score = (player_dice[0] * player_dice[1]) if player_dice[0] == player_dice[1] else sum(player_dice)
    dealer_score = (dealer_dice[0] * dealer_dice[1]) if dealer_dice[0] == dealer_dice[1] else sum(dealer_dice)

    result = "WIN" if player_score > dealer_score else "DEFEAT"
    return jsonify({
        'player_dice': player_dice,
        'dealer_dice': dealer_dice,
        'player_score': player_score,
        'dealer_score': dealer_score,
        'result': result
    })

if __name__ == '__main__':
    app.run(debug=True)
