public class CardAt {
	public static void main(String[] args) {
		// ทดสอบผลลัพธ์
		initTest();
	}
	
	public static String cardAt(int number) {
		// ประกาศตัวแปร
		String[] cardFace = {"C", "D", "H", "S"};
		String[] cardNumber = {"2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K", "A" };
		final int CARD_LIMIT = cardFace.length * cardNumber.length; 
		
		// เช็คว่าค่าตัวเลขทีใส่มาเกินจำนวนของไพ่ทั้งหมดหรือไม่ ถ้าเกินให้คำนวณหาลำดับของไพ่ใหม่
		if (number > CARD_LIMIT) {
			number = number % CARD_LIMIT - 1; // ลำดับของไพ่เริ่มต้นจาก 0 จึงต้อง -1
		}
		
		// นำค่าจาก Parameter มาหาคู่ Index เพื่อหาเลขของไพ่ที่จะนำไปแสดงผล
		int numberToCardFace = number / cardNumber.length; // นำมาหาร เพื่อหา ดอกไพ่
		int numberToCardNumber = number % cardNumber.length; // นำมาม็อท เพื่อหา เลขไพ่
		
		// Return ลำดับของไพ่ที่ได้ไปแสดงผล
		return  cardNumber[numberToCardNumber] + cardFace[numberToCardFace];
	}

	public static void initTest(){
		System.out.println(cardAt(0));
		System.out.println(cardAt(1));
		System.out.println(cardAt(34));
		System.out.println(cardAt(35));
	}
}
