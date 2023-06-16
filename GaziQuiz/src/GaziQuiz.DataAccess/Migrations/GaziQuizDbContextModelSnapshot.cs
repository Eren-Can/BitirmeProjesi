﻿// <auto-generated />
using System;
using GaziQuiz.DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GaziQuiz.DataAccess.Migrations
{
    [DbContext(typeof(GaziQuizDbContext))]
    partial class GaziQuizDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("GaziQuiz.Models.Entities.Answer", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("IsTrue")
                        .HasColumnType("bit");

                    b.Property<string>("QuestionId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Reply")
                        .HasMaxLength(2)
                        .HasColumnType("nvarchar(2)");

                    b.Property<string>("ResultId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Time")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.HasIndex("ResultId");

                    b.ToTable("Answers", (string)null);
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.CrossTables.QuestionQuiz", b =>
                {
                    b.Property<string>("QuestionId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("QuizId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("QuestionId", "QuizId");

                    b.HasIndex("QuizId");

                    b.ToTable("QuestionQuizs", (string)null);
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.CrossTables.StudentLesson", b =>
                {
                    b.Property<string>("StudentId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LessonId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("StudentId", "LessonId");

                    b.HasIndex("LessonId");

                    b.ToTable("StudentLessons", (string)null);
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.CrossTables.StudentQuiz", b =>
                {
                    b.Property<string>("QuizId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("StudentId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("QuizId", "StudentId");

                    b.HasIndex("StudentId");

                    b.ToTable("StudentQuizs", (string)null);
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Lesson", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("TeacherId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("TeacherId");

                    b.ToTable("Lessons", (string)null);
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Question", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasMaxLength(2)
                        .HasColumnType("nvarchar(2)");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Difficulty")
                        .HasColumnType("int");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<int>("Time")
                        .HasColumnType("int");

                    b.Property<string>("TopicId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("TopicId");

                    b.ToTable("Questions", (string)null);
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Quiz", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("Latitude")
                        .HasPrecision(11, 7)
                        .HasColumnType("decimal(11,7)");

                    b.Property<decimal>("Longitude")
                        .HasPrecision(11, 7)
                        .HasColumnType("decimal(11,7)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Time")
                        .HasColumnType("int");

                    b.Property<string>("TopicId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("TopicId");

                    b.ToTable("Quizs", (string)null);
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Result", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("QuizId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("StudentId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("TotalTime")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuizId");

                    b.HasIndex("StudentId");

                    b.ToTable("Results", (string)null);
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Topic", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LessonId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("LessonId");

                    b.ToTable("Topics", (string)null);
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole<string>", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityRole<string>");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Student", b =>
                {
                    b.HasBaseType("GaziQuiz.Models.Entities.User");

                    b.Property<string>("SchoolNumber")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.ToTable("Students", (string)null);
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Teacher", b =>
                {
                    b.HasBaseType("GaziQuiz.Models.Entities.User");

                    b.ToTable("Teachers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityRole<string>");

                    b.HasDiscriminator().HasValue("IdentityRole");

                    b.HasData(
                        new
                        {
                            Id = "11c2df73-7e96-4f8a-8d74-d4a0e91decaf",
                            ConcurrencyStamp = "75cfa0e0-a5a8-4945-9c2c-59305c313c38",
                            Name = "admin",
                            NormalizedName = "ADMIN"
                        },
                        new
                        {
                            Id = "fbd99b4b-4933-4a31-a656-427efcdd0b79",
                            ConcurrencyStamp = "469b6fc0-9e6d-449c-a4bb-fea1affed538",
                            Name = "teacher",
                            NormalizedName = "TEACHER"
                        },
                        new
                        {
                            Id = "516cb176-46ab-4d8d-980e-8244862e668b",
                            ConcurrencyStamp = "36d8f8eb-cf91-46d7-a8da-2e93489d373e",
                            Name = "student",
                            NormalizedName = "STUDENT"
                        });
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Answer", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.Question", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("GaziQuiz.Models.Entities.Result", "Result")
                        .WithMany("Answers")
                        .HasForeignKey("ResultId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Question");

                    b.Navigation("Result");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.CrossTables.QuestionQuiz", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.Question", "Question")
                        .WithMany("Quizs")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GaziQuiz.Models.Entities.Quiz", "Quiz")
                        .WithMany("Questions")
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Question");

                    b.Navigation("Quiz");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.CrossTables.StudentLesson", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.Lesson", "Lesson")
                        .WithMany("Students")
                        .HasForeignKey("LessonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GaziQuiz.Models.Entities.Student", "Student")
                        .WithMany("Lessons")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lesson");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.CrossTables.StudentQuiz", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.Quiz", "Quiz")
                        .WithMany("Students")
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GaziQuiz.Models.Entities.Student", "Student")
                        .WithMany("Quizs")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Quiz");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Lesson", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.Teacher", "Teacher")
                        .WithMany("Lessons")
                        .HasForeignKey("TeacherId");

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Question", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.Topic", "Topic")
                        .WithMany("Questions")
                        .HasForeignKey("TopicId")
                        .IsRequired();

                    b.Navigation("Topic");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Quiz", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.Topic", "Topic")
                        .WithMany("Quizs")
                        .HasForeignKey("TopicId");

                    b.Navigation("Topic");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Result", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.Quiz", "Quiz")
                        .WithMany("Results")
                        .HasForeignKey("QuizId");

                    b.HasOne("GaziQuiz.Models.Entities.Student", "Student")
                        .WithMany("Results")
                        .HasForeignKey("StudentId");

                    b.Navigation("Quiz");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Topic", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.Lesson", "Lesson")
                        .WithMany("Topics")
                        .HasForeignKey("LessonId");

                    b.Navigation("Lesson");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<string>", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<string>", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GaziQuiz.Models.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Student", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.User", null)
                        .WithOne()
                        .HasForeignKey("GaziQuiz.Models.Entities.Student", "Id")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Teacher", b =>
                {
                    b.HasOne("GaziQuiz.Models.Entities.User", null)
                        .WithOne()
                        .HasForeignKey("GaziQuiz.Models.Entities.Teacher", "Id")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Lesson", b =>
                {
                    b.Navigation("Students");

                    b.Navigation("Topics");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Question", b =>
                {
                    b.Navigation("Answers");

                    b.Navigation("Quizs");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Quiz", b =>
                {
                    b.Navigation("Questions");

                    b.Navigation("Results");

                    b.Navigation("Students");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Result", b =>
                {
                    b.Navigation("Answers");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Topic", b =>
                {
                    b.Navigation("Questions");

                    b.Navigation("Quizs");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Student", b =>
                {
                    b.Navigation("Lessons");

                    b.Navigation("Quizs");

                    b.Navigation("Results");
                });

            modelBuilder.Entity("GaziQuiz.Models.Entities.Teacher", b =>
                {
                    b.Navigation("Lessons");
                });
#pragma warning restore 612, 618
        }
    }
}
