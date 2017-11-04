public class CardAt {
	public static void main(String[] args) {

		initTest();
	}

	public static String cardAt(int number) {

		if (number < 0)
			number *= (-1);

		String[] cardFace = { "C", "D", "H", "S" };
		String[] cardNumber = { "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K", "A" };
		final int CARD_LIMIT = cardFace.length * cardNumber.length;

		if (number > CARD_LIMIT)
			number = number % CARD_LIMIT - 1;

		int numberToCardFace = number / cardNumber.length;
		int numberToCardNumber = number % cardNumber.length;

		try {
			return cardNumber[numberToCardNumber] + cardFace[numberToCardFace];
		} catch (IndexOutOfBoundsException e) {
			return "Error index out of bound [ " + numberToCardNumber + ", " + numberToCardFace + " ]";
		}
	}

	public static void initTest() {
		System.out.println(cardAt(0));
		System.out.println(cardAt(1));
		System.out.println(cardAt(34));
		System.out.println(cardAt(35));
	}
}
