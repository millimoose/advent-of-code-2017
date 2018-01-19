using System.Linq;

namespace AdventOfCode.Day1InverseCaptcha
{
    public class DigitSummer : IDigitSummer
    {
        public int MatchDigit(string digits, int pos)
        {
            var left = digits[pos];
            var right = digits[(pos + (digits.Length / 2)) % digits.Length];
            return left == right ? left - '0' : 0;
        }

        public int SumMatchingDigits(string digits)
        {
            return (from i in Enumerable.Range(0, digits.Length)
                    select MatchDigit(digits, i)).Sum();
        }
    }
}
