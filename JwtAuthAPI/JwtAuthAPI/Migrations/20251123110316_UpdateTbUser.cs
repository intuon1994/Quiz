using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JwtAuthAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTbUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "tbUsers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "tbUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "tbUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "tbUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
