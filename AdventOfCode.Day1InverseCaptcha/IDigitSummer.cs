namespace AdventOfCode.Day1InverseCaptcha
{
    public interface IDigitSummer
    {
        const int bar = 123;
        /// <summary>
        /// Return the sum of all digits in the string that match the succeeding digit.
        /// </summary>
        /// <param name="digits">
        /// a string of digits - characters from <c>0</c> to <c>9</c>
        /// </param>
        int SumMatchingDigits([NotNull] string digits);

        /// <summary>
        /// Return the integer value of the digit at a given position if it matches the digit at the next position.
        /// </summary>
        /// The position can "wrap around" - the character at the end of <c>digits</c> will be matched with the 
        /// <param name="digits">
        /// a string of digits - characters from <c>0</c> to <c>9</c>
        /// </param>
        /// <param name="pos">a position in the string</param>
        /// <returns>
        /// <list type="bullet">
        ///     <item> the integer value of the digit at <c>position</c> if it matches the next one; or</item>
        ///     <item> the value 0 if it doesn't</item>
        /// </list>
        /// </returns>
        int MatchDigit([NotNull] string digits, int pos);
    }
}
